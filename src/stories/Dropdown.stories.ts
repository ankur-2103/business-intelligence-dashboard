import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';

const meta = {
    title: 'dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
    }
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'dropdown'
    }
}