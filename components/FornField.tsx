import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Controller, FieldValues  , Control, Path} from 'react-hook-form'
interface FormFieldProps<T extends FieldValues>{
control:Control<T>;
name:Path<T>;
label:string;
placeholder?:string;
type?:'text'|'email'|'password'|'file'
}
const FornField = ({control , name , label , placeholder , type="text"}:FormFieldProps<T>) => (
   <Controller 
   name={name}
   control={control}
   render={({field})=>(
    <FormItem>
        <FormLabel className='label'>{label}</FormLabel>
        <FormControl>
            <Input className='input' placeholder={placeholder} {...field} type={type}/>
        </FormControl>
       
    </FormItem>
   )}
   />
)

export default FornField