import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void

}

export const EditableSpan: FC<EditableSpanPropsType> = ({title, onChange}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(title)

    const activateEditMode = () => {
        setEdit(!edit)
        setNewTitle(title)
    }
    const activateViewMode = () => {
        setEdit(false)
        onChange(newTitle)
    }
    const changeEditTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }



    return (
        edit
        ? <input value={newTitle} onChange={changeEditTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode} >{title}</span>
    );
};
