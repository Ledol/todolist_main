import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: "TODOLISTS/EditableSpan Component",
    component: EditableSpan,
    args:{
        onChange: action ('EditableSpan value changed')
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditMode = Template.bind({});
EditMode.args = {
    title: 'CSS'
};