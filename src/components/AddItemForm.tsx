import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";


export type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = ({addItem}) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addNewTaskHandler()
        }
    }
    const addNewTaskHandler = () => {
        if (newTitle.trim() !== '') {
            addItem(newTitle)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField variant='outlined'
                       value={newTitle}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
            />
            <Button variant='contained' color='primary' onClick={addNewTaskHandler}
                    style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>+</Button>

            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

