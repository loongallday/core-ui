import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from './theme-provider'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

const meta: Meta<typeof ThemeProvider> = {
  title: 'Configuration/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ThemeProvider>

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Default Theme</h2>
        <div className="flex gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Card Example</CardTitle>
          </CardHeader>
          <CardContent>
            This uses the default theme configuration.
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  ),
}

export const LargeRadius: Story = {
  render: () => (
    <ThemeProvider config={{ radius: 'lg' }}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Large Border Radius</h2>
        <div className="flex gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Card Example</CardTitle>
          </CardHeader>
          <CardContent>
            This uses large border radius (0.75rem).
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  ),
}

export const NoRadius: Story = {
  render: () => (
    <ThemeProvider config={{ radius: 'none' }}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">No Border Radius</h2>
        <div className="flex gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Card Example</CardTitle>
          </CardHeader>
          <CardContent>
            This uses no border radius (sharp corners).
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  ),
}

export const CustomColors: Story = {
  render: () => (
    <ThemeProvider 
      config={{ 
        colors: {
          primary: '220 90% 50%',
          secondary: '280 80% 60%',
        }
      }}
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Colors</h2>
        <div className="flex gap-4">
          <Button>Custom Primary</Button>
          <Button variant="secondary">Custom Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Card Example</CardTitle>
          </CardHeader>
          <CardContent>
            This uses custom primary and secondary colors.
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  ),
}

export const CompactSpacing: Story = {
  render: () => (
    <ThemeProvider config={{ spacing: 'compact' }}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Compact Spacing</h2>
        <p className="text-muted-foreground">12.5% less spacing throughout</p>
        <div className="flex gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Compact Card</CardTitle>
          </CardHeader>
          <CardContent>
            Notice the tighter spacing in this card.
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  ),
}

export const RelaxedSpacing: Story = {
  render: () => (
    <ThemeProvider config={{ spacing: 'relaxed' }}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Relaxed Spacing</h2>
        <p className="text-muted-foreground">12.5% more spacing throughout</p>
        <div className="flex gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Relaxed Card</CardTitle>
          </CardHeader>
          <CardContent>
            Notice the more spacious layout in this card.
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  ),
}

export const NoAnimations: Story = {
  render: () => (
    <ThemeProvider config={{ animations: 'none' }}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">No Animations</h2>
        <p className="text-muted-foreground">All animations are disabled</p>
        <div className="flex gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </div>
    </ThemeProvider>
  ),
}



