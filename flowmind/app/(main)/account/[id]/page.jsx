import { getAccountWithTransactions } from '@/actions/account';
import { notFound } from 'next/navigation';
import React from 'react'

const AccountsPage = async ({params}) => {

    const accountData = await getAccountWithTransactions(params.id);

    if(!accountData){
        notFound();
    }
  return <div>{params.id}</div>
}

export default AccountsPage;