import type { Meta, StoryObj } from '@storybook/react'
import { SkeletonCard } from './SkeletonCard'

const meta: Meta<typeof SkeletonCard> = {
  title: 'Loading/SkeletonCard',
  component: SkeletonCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SkeletonCard>

export const Default: Story = {
  render: () => <SkeletonCard />,
}

export const Multiple: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ),
}



