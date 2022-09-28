import { FigmaExportRC, ComponentsCommandOptions } from "@figma-export/types";
import transformSvgWithSvgo from "@figma-export/transform-svg-with-svgo";
import transformSvgWithSvgr from "@figma-export/output-components-as-svgr";
import traverse from "@babel/traverse";
import * as FigmaExport from '@figma-export/types';
import { pascalCase } from '@figma-export/utils';
import * as t from "@babel/types";


const getComponentName = (options: FigmaExport.ComponentOutputterParamOption): string => `${pascalCase(options.basename)}`;
const getComponentFilename = (options: FigmaExport.ComponentOutputterParamOption): string => `${getComponentName(options)}`;

const componentOptions: ComponentsCommandOptions = {
  fileId: "ZonA86DORDAAmZs1jUyMeb",
  // version: 'xxx123456', // optional - file's version history is only supported on paid Figma plans
  // onlyFromPages: ["MonoIcons"],
  transformers: [
    transformSvgWithSvgo({
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
        {
          name: "removeXMLNS",
          active: true,
        },
      ],
    }),
  ],
  outputters: [
    transformSvgWithSvgr({
      output: 'src/components/Icons',
      getFileExtension: () => ".tsx",
      getSvgrConfig: () => ({
        expandProps: "end",
        icon: true,
        native: true,
        plugins: [
          "@svgr/plugin-svgo",
          "@svgr/plugin-jsx",
          "@svgr/plugin-prettier",
        ],
        template: ({ componentName, props, imports, jsx, exports }, { tpl }) => {
          const nodeNeedRename: t.JSXAttribute[] = [];

          traverse(jsx, {
            JSXElement(jsxPath) {
              // @ts-ignore
              if (jsxPath.node.openingElement.name.name === 'path') {
                jsxPath.traverse({
                  JSXAttribute(path) {
                    if (path.node.name.name === 'fill') {
                      // if (t.isStringLiteral(path.node.value) && path.node.value.value === '#000') {
                      if (t.isStringLiteral(path.node.value)) {
                        // path.node.value.value = 'currentColor';
                        nodeNeedRename.push(path.node);
                        path.stop();
                      }
                    }
                  }
                })
              }
            },
            noScope: true,
          })

          if (nodeNeedRename.every(node => ['#000', '#000000'].includes((node?.value as t.StringLiteral)?.value))) {
            nodeNeedRename.forEach(node => {
              (node!.value as t.StringLiteral).value = 'currentColor';
            })
          }

          return tpl`
            ${imports}
            const ${componentName} = (${props}) => (${jsx});
            ${exports}
          `
        },
        typescript: true,
        prettier: true,
      }),
      getExportTemplate(options) {
        const reactComponentName = getComponentName(options);
        const reactComponentFilename = `${getComponentFilename(options)}`;
        return `export { default as ${reactComponentName} } from './${reactComponentFilename}';`;
      },
    }),
  ],
};

(module.exports as FigmaExportRC) = {
  commands: [["components", componentOptions]],
};
