"use client";

import { createTransaction } from '@/actions/transaction';
import { transactionSchema } from '@/app/lib/schema';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from 'next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup';
import React from 'react'
import { useForm } from 'react-hook-form';

const AddTransactionForm = ({accounts , categories}) => {

  const {register , setValue , handleSubmit ,formState:{errors} , watch , getValues , reset } 
  = useForm({
    resolver:zodResolver(transactionSchema),
    defaultValues :{
      type: "EXPENSE",
      amount: "",
      description: "",
      accountId: accounts.find((ac) => ac.isDefault)?.id ,
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

  const filteredCategories = categories.filter(
    (category) => category.type === type
  )

  return ( <form className='space-y-6'>
        {/* AI Reciept Scanner */}
      <div className='space-y-6'>
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
          <p className='text-sm text-red-500'>{errors.type.message}</p>
        )}
      </div>

    <div className='grid gap-6 md:grid-cols-2'>
      <div className='space-y-6'>
        <label className='text-sm font-medium'>Amount</label>
        <Input 
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register("amount")}
        />
        {errors.amount && (
          <p className='text-sm text-red-500'>{errors.amount.message}</p>
        )}
      </div>

      <div className='space-y-6'>
        <label className='text-sm font-medium'>Account</label>
        <Select 
          onValueChange={(value) => setValue("accountId" , value)}
          defaultValue={getValues("accountId")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Account"/>
          </SelectTrigger>
          <SelectContent>
             {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.name} (₹{parseFloat(account.balance).toFixed(2)})
              </SelectItem>
             ))}
            <CreateAccountDrawer>
              <Button 
                variant="ghost"
                className={`w-full select-none items-center text-sm outline-none`}
              >
                Create Account
              </Button>
            </CreateAccountDrawer>
          </SelectContent>
        </Select>

        {errors.type && (
          <p className='text-sm text-red-500'>{errors.type.message}</p>
        )}
      </div>
    </div>

      <div className='space-y-6'>
        <label className='text-sm font-medium'>Category</label>
        <Select 
          onValueChange={(value) => setValue("category" , value)}
          defaultValue={getValues("category")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category"/>
          </SelectTrigger>
          <SelectContent>
             {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name} 
              </SelectItem>
             ))}
          </SelectContent>
        </Select>

        {errors.type && (
          <p className='text-sm text-red-500'>{errors.type.message}</p>
        )}
      </div>
    </form>
  )
}

export default AddTransactionForm