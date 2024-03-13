'use client';

import useConversation from "../../../../app/hooks/useConversation";
import MessageInput from "./MessageInput";

import axios from "axios";
import { CldUploadButton } from 'next-cloudinary';
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { HiPaperAirplane ,HiPhoto } from "react-icons/hi2";
import conversationId from "../page";
import React from "react";


const Form = () => {
    const { conversationId } = useConversation();
    const { 
        register, 
        handleSubmit, 
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });

        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    };

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return (
        <div className="mb-12 px-4 ng-white border-none flex items-center gap-2 lg:gap-4 w-full">
            <form 
                action="POST"
                onSubmit={ handleSubmit(onSubmit) }
                className="
                    flex
                    items-center
                    gap-2
                    lg:gap-4
                    w-full
                    justify-center"
            >
                <MessageInput 
                    id='message'
                    register={register}
                    errors={errors}
                    required
                    placeholder="Message Serenity..."
                />
                
            </form>
        </div>
    );
}

export default Form;