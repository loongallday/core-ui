import type { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from './PageHeader'
import { Button } from '../ui/button'

const meta: Meta<typeof PageHeader> = {
  title: 'Responsive/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    title: 'Page Title',
    subtitle: 'This is a page subtitle',
  },
}

export const WithAction: Story = {
  args: {
    title: 'Users',
    subtitle: 'Manage your team members',
    actions: <Button>Add User</Button>,
  },
}

export const WithMultipleActions: Story = {
  args: {
    title: 'User Details',
    subtitle: 'View and edit user information',
    actions: (
      <div className="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    ),
  },
}

export const LongTitle: Story = {
  args: {
    title: 'This is a Very Long Page Title That Will Wrap on Mobile Devices',
    subtitle: 'This subtitle provides additional context about the page content and purpose',
    actions: (
      <div className="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </div>
    ),
  },
}


