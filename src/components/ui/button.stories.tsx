import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl', 'icon'],
    },
    fullWidth: {
      control: 'boolean',
    },
    touchOptimized: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon">⚡</Button>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Loading</Button>
      <Button loading variant="outline">Loading Outline</Button>
      <Button loading variant="secondary">Loading Secondary</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<span>📧</span>}>Email</Button>
      <Button rightIcon={<span>→</span>}>Next</Button>
      <Button leftIcon={<span>←</span>} rightIcon={<span>→</span>}>Navigate</Button>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="outline">Full Width Outline</Button>
      <Button fullWidth variant="secondary">Full Width Secondary</Button>
    </div>
  ),
}

export const TouchOptimized: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button touchOptimized>Touch Optimized</Button>
      <Button touchOptimized size="icon">⚡</Button>
      <Button touchOptimized variant="outline">Touch Outline</Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">Disabled Outline</Button>
      <Button disabled variant="secondary">Disabled Secondary</Button>
    </div>
  ),
}

export const MobileOptimized: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Button fullWidth touchOptimized size="lg">
        Mobile-Friendly Button
      </Button>
      <Button fullWidth touchOptimized variant="outline">
        Touch-Optimized Outline
      </Button>
      <div className="flex gap-2">
        <Button touchOptimized size="icon">🏠</Button>
        <Button touchOptimized size="icon">⚙️</Button>
        <Button touchOptimized size="icon">📱</Button>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  args: {
    children: 'Click me',
    onClick: () => alert('Button clicked!'),
  },
}



