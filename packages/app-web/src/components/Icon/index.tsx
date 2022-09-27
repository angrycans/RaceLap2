import type { FC, SVGProps } from 'react';
import classnames from 'classnames';
import './index.module.less';

type Type =
  | 'colored-icons'
  | 'mono-icons'

const IconTypeMap: Record<Type, string> = {
  'colored-icons': 'ColoredIcons',
  'mono-icons': 'MonoIcons'
}

interface Props extends SVGProps<SVGSVGElement> {
  /** icon 库名， 默认为 `mono-Icons` */
  type?: Type;
  /**
   * icon 名称
   * @see https://www.figma.com/file/ZonA86DORDAAmZs1jUyMeb/xlap-react-icon?node-id=0%3A1
   * */
  name: string;
}

export const Icon: FC<Props> = (props) => {
  const { type = 'mono-icons', name, color, style, className, ...rest } = props;
  const filename = IconTypeMap[type];
  return (
    <svg
      role='img'
      styleName='icon'
      className={classnames(className)}
      style={{ ...style, color: color || style?.color }}
      preserveAspectRatio="none"
      // viewBox="0,0,24,24"
      {...rest}
    >
      <use xlinkHref={`./icons/${filename}.svg#${filename}/${name}`}/>
    </svg>
  )
}

export default Icon;
