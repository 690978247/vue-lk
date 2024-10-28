import type { RouteComponent } from 'vue-router'

export interface RouteData {
  path: string
  name: string
  component: RouteComponent
  redirect: string
  children: Array<RouteData>
  meta: Meta
}

export interface Meta {
  title?: string
  icon?: string
  hidden?: boolean
}

export interface OnlyOneChild {
  path: string
  name: string
  meta?: Meta
  noShowingChildren?: boolean
}
