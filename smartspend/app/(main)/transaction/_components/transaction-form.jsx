"use client";

import { createTransaction } from '@/actions/transaction';
import { transactionSchema } from '@/app/lib/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from 'next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup';
import React from 'react'
import { useForm } from 'react-hook-form';

const AddTransactionForm = () => {

  const {register , setValue , handleSubmit ,formState:{errors} , watch , getValues , reset } 
  = useForm({
    resolver:zodResolver(transactionSchema),
    defaultValues :{
      type: "EXPENSE",
      amount: "",
      description: "",
      accountId: AccountsPage.find((ac) => ac.isDefault)?.id ,
      date : new Date(),
      isRecurring: false,
    }
  });

  const {
    loading: transactionLoading,
    fn : transactionFn,
    data: transactionResult,
  } = useFetch(createTransaction)

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");



  return ( <form className='space-y-6'>
        {/* AI Reciept Scanner */}
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Type</label>
        <Select 
          onValueChange={(value) => setValue("type" , value)}
          defaultValue={type}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>

        {errors.type && (
          <p className='text-sm text-red-500'>{errors.amount.message}</p>
        )}
      </div>


      <div className='space-y-2'>
        <label className='text-sm font-medium'>Type</label>
        <Input 
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register("amount")}
        />

        {errors.type && (
          <p className='text-sm text-red-500'>{errors.amount.message}</p>
        )}
      </div>

    </form>
  )
}

export default AddTransactionForm