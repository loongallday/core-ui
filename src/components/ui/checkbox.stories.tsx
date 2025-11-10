import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled" disabled />
      <label htmlFor="disabled" className="text-sm font-medium opacity-70">
        Disabled checkbox
      </label>
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="marketing"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Marketing emails
          </label>
          <p className="text-sm text-muted-foreground">
            Receive emails about new products, features, and more.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="security" defaultChecked />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="security" className="text-sm font-medium leading-none">
            Security updates
          </label>
          <p className="text-sm text-muted-foreground">
            Get notified when there are security updates.
          </p>
        </div>
      </div>
    </div>
  ),
}



