import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';

const meta = {
    title: 'table',
    component: Table,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
    }
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: ''
    }
}