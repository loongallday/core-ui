import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Inbox</h3>
        <Badge>12</Badge>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Spam</h3>
        <Badge variant="destructive">99+</Badge>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Drafts</h3>
        <Badge variant="secondary">3</Badge>
      </div>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge className="bg-green-500">Active</Badge>
      <Badge className="bg-yellow-500">Pending</Badge>
      <Badge className="bg-red-500">Inactive</Badge>
      <Badge className="bg-blue-500">In Progress</Badge>
    </div>
  ),
}



