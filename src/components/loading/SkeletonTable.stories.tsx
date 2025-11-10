import type { Meta, StoryObj } from '@storybook/react'
import { SkeletonTable } from './SkeletonTable'

const meta: Meta<typeof SkeletonTable> = {
  title: 'Loading/SkeletonTable',
  component: SkeletonTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SkeletonTable>

export const Default: Story = {
  args: {
    rows: 5,
    columns: 4,
  },
}

export const ManyRows: Story = {
  args: {
    rows: 10,
    columns: 4,
  },
}

export const ManyColumns: Story = {
  args: {
    rows: 5,
    columns: 6,
  },
}

export const Small: Story = {
  args: {
    rows: 3,
    columns: 3,
  },
}



