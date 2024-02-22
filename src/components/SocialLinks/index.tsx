// 引入 React 库和必要的组件
import React from 'react'
import Tooltip from '@site/src/components/Tooltip' // 自定义的 Tooltip 组件，用于显示悬浮提示
import { Icon } from '@iconify/react' // Iconify 图标库的 React 组件，用于显示图标
import social from '@site/data/social' // 社交链接数据，假设这是一个对象，包含各社交平台的信息
import styles from './styles.module.scss' // SCSS 模块化样式

// 定义 Social 对象类型，包含各种社交平台的链接
export type Social = {
  github?: string
  twitter?: string
  juejin?: string
  csdn?: string
  qq?: string
  wx?: string
  cloudmusic?: string
  zhihu?: string
  email?: string
}

// 定义 SocialLink 组件的 Props 类型
interface Props {
  href: string // 链接地址
  title: string // 链接标题
  color?: string // 链接图标的颜色（可选）
  icon: string | JSX.Element // 图标，可以是一个字符串（图标的名称）或一个 JSX 元素
  [key: string]: unknown // 允许 Props 中有其他任意属性
}

// SocialLink 组件，用于渲染单个社交链接
function SocialLink({ href, icon, title, color, ...prop }: Props) {
  return (
    // 使用 Tooltip 组件包裹链接，显示悬浮提示
    <Tooltip key={title} text={title} anchorEl="#__docusaurus" id={`tooltip-${title}`}>
      <a href={href} target="_blank" {...prop} title={title}>
        {/* 判断 icon 是否为字符串，如果是，则使用 Icon 组件渲染图标；如果不是，则直接渲染 JSX 元素 */}
        {typeof icon === 'string' ? <Icon icon={icon} /> : icon}
      </a>
    </Tooltip>
  )
}

// SocialLinks 组件，用于渲染一组社交链接
export default function SocialLinks({ ...prop }) {
  return (
    // 使用 SCSS 模块化样式类名
    <div className={styles.socialLinks} {...prop}>
      {/* 遍历 social 对象，过滤出有 href 属性的项，然后为每项渲染一个 SocialLink 组件 */}
      {Object.entries(social)
        .filter(([_key, { href }]) => href)
        .map(([key, { href, icon, title, color }]) => {
          return (
            // 传递必要的 Props 给 SocialLink 组件
            <SocialLink
              key={key}
              href={href!}
              title={title}
              icon={icon}
              style={{ '--color': color }} // 使用 CSS 变量设置颜色
            ></SocialLink>
          )
        })}
    </div>
  )
}
