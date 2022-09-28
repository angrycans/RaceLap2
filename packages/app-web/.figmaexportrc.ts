import { FigmaExportRC, ComponentsCommandOptions } from "@figma-export/types";
import outputComponentsAsSvgstore from "@figma-export/output-components-as-svgstore";

const styleOptions: ComponentsCommandOptions = {
  fileId: 'ZonA86DORDAAmZs1jUyMeb',
  outputters: [
    pages => {
      pages.forEach(page => {
        page.components.forEach(component => {
          component.svg = component.svg.replace(
            /(<path[^>]*?fill=")([^"]+)("[^\>]*?>)/,
            (_, $1, $2, $3 ) => `${$1}${['#000', '#000000', 'black'].includes($2) ? 'currentColor' : $2}${$3}`
          )
        });
      })

      return outputComponentsAsSvgstore({
        output: './public/icons',
      })(pages)
    }
  ]
};

(module.exports as FigmaExportRC) = {
  commands: [
    ['components', styleOptions],
  ]
};
