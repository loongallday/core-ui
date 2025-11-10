import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Input placeholder="Default input" />
      <Input variant="error" placeholder="Error input" error="This field is required" />
      <Input variant="success" placeholder="Success input" success="Looks good!" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Input size="xs" placeholder="Extra small input" />
      <Input size="sm" placeholder="Small input" />
      <Input size="default" placeholder="Default input" />
      <Input size="lg" placeholder="Large input" />
      <Input size="xl" placeholder="Extra large input" />
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Input leftIcon={<span>🔍</span>} placeholder="Search..." />
      <Input rightIcon={<span>✉️</span>} placeholder="Email address" />
      <Input 
        leftIcon={<span>🔒</span>} 
        rightIcon={<span>👁️</span>} 
        type="password" 
        placeholder="Password" 
      />
    </div>
  ),
}

export const WithErrors: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div>
        <Input 
          id="email-error"
          placeholder="Email address" 
          error="Invalid email address"
        />
        <p id="email-error-error" className="mt-1 text-sm text-destructive">
          Invalid email address
        </p>
      </div>
      <div>
        <Input 
          id="password-error"
          type="password"
          placeholder="Password" 
          error="Password must be at least 8 characters"
        />
        <p id="password-error-error" className="mt-1 text-sm text-destructive">
          Password must be at least 8 characters
        </p>
      </div>
    </div>
  ),
}

export const WithSuccess: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div>
        <Input 
          id="email-success"
          placeholder="Email address" 
          success="Email is available"
          defaultValue="user@example.com"
        />
        <p id="email-success-success" className="mt-1 text-sm text-green-600">
          Email is available
        </p>
      </div>
    </div>
  ),
}

export const InputModes: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Input inputMode="email" placeholder="Email (email keyboard)" />
      <Input inputMode="tel" placeholder="Phone (tel keyboard)" />
      <Input inputMode="numeric" placeholder="Number (numeric keyboard)" />
      <Input inputMode="url" placeholder="URL (url keyboard)" />
      <Input inputMode="search" placeholder="Search (search keyboard)" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="date" placeholder="Date input" />
      <Input type="time" placeholder="Time input" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <Input fullWidth placeholder="Full width input" />
      <Input fullWidth={false} placeholder="Auto width input" />
    </div>
  ),
}



