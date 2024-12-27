export interface LayoutProps {
    children: React.ReactNode
}

export interface ApproachProps {
    index: number
    title: string
    paragraph: string
    selectedId?: number
    onClick?: () => void
}
