import { HomeRouters } from './home'
import { BlogRouters } from './blog'
import { ProjectRouters } from './project'
import { ToolRouters } from './tool'

export const dynamicRouters = [...HomeRouters, ...BlogRouters, ...ProjectRouters, ...ToolRouters]
