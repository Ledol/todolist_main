import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import { IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


export type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = memo(({addItem}) => {
    console.log('AddItemForm was call')

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
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
                       error={!!error}
                       label='Title'
                       helperText={error}
            />

            <IconButton color='primary' onClick={addNewTaskHandler}>
                <AddBox/>
            </IconButton>


        </div>
    );
});

