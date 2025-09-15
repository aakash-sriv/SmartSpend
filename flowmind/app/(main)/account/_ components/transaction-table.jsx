"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { categoryColors } from '@/data/categories';
import { format } from 'date-fns/format';
import { se } from 'date-fns/locale/se';
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCw, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { fi } from 'zod/v4/locales';

const RECURRING_INTERVALS = { 
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
}

const Transactiontable = ({transactions}) => {

    const router = useRouter();

    const [selectedIds , setSelectedIds] = useState([]);
    const [sortConfig , setSortConfig] = useState({
        field: "date",
        direction: "desc",
    });

    //filter content

    const[searchTerm , setSearchTerm] = useState("");
    const[typeFilter ,setTypeFilter ] = useState("");
    const[recurringFilter , setRecurringFilter] = useState("");

    const filteredAndSortedTransactions = transactions;

    const handleSort = (field) => {
        setSortConfig((current) => ({
            field,
            direction: 
                current.field === field && current.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleSelect = (id) => {
        setSelectedIds(current =>current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
    };

    const handleSelectAll = () => {
        if(selectedIds.length === transactions.length){
            setSelectedIds([]);
        } else {
            setSelectedIds(transactions.map((transaction) => transaction.id));
        }
    }
    // const xhandleSelectAll = () => {
    //     setSelectedIds((current) => 
    //         current.length === filteredAndSortedTransactions.length
    //         ? []
    //         : filteredAndSortedTransactions.map((transaction) => transaction.id)    
    //     );
    // };
    const handleBulkDelete = () => {

    };

  return (
    <div className='space-y-4'>
        {/* Filter */}

        <div className='flex flex-col sm:flex-row md:flex-row md:items-center justify-between gap-4'>
            <div className='relative flex-1'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input  
                    className={`pl-8`}
                    placeholder='Search transactions...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className='flex items-center gap-2'>
                <Select value={typeFilter} onValueChange={setTypeFilter}  >
                    <SelectTrigger>
                        <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value= "INCOME">Income</SelectItem>
                        <SelectItem value= "EXPENSE">Expense</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={recurringFilter} onValueChange={(value) => setRecurringFilter(value)}  >
                    <SelectTrigger className={`w-[150px]`}>
                        <SelectValue placeholder= "All transaction" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value= "recurring">Recurring Only</SelectItem>
                        <SelectItem value= "non-recurring">Non-Recurring Only</SelectItem>
                    </SelectContent>
                </Select>
                {selectedIds.length > 0 && (
                    <div>
                        <Button 
                            variant={`destructive`}
                            size="sm"
                            onClick={handleBulkDelete}
                        >
                            Delete Selected ({selectedIds.length})
                        </Button>                        
                    </div>
                )}
            </div>
        </div>


        



        {/* Transactions table */}
        <div className='rounded-md border'>            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox onCheckedChange = {handleSelectAll}
                                checked={
                                    selectedIds.length===
                                    filteredAndSortedTransactions.length && 
                                    filteredAndSortedTransactions.length>0 }
                            />
                        </TableHead>
                        <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("date")}
                        >
                            <div className='flex items-center'>Date 
                                {sortConfig.field === 'date' && (
                                sortConfig.direction === 'asc' ? (
                                <ChevronUp className='ml-2 h-4 w-4'/>
                                 ) : (
                                 <ChevronDown className='ml-2 h-4 w-4'/>
                                 )
                                )}
                            </div>
                        </TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("category")}
                        >
                            <div className='flex items-center'>Category 
                                {sortConfig.field === 'category' && (
                                sortConfig.direction === 'asc' ? (
                                <ChevronUp className='ml-2 h-4 w-4'/>
                                 ) : (
                                 <ChevronDown className='ml-2 h-4 w-4'/>
                                 )
                                )}
                            </div>
                        </TableHead>
                        <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("amount")}
                        >
                            <div className='flex items-center justify-end'>Amount
                                {sortConfig.field === 'amount' && (
                                sortConfig.direction === 'asc' ? (
                                <ChevronUp className='ml-2 h-4 w-4'/>
                                 ) : (
                                 <ChevronDown className='ml-2 h-4 w-4'/>
                                 )
                                )}
                            </div>
                        </TableHead>
                        <TableHead>Recurring</TableHead>
                        <TableHead className={`w-[50px]`} />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedTransactions.length === 0 ?(
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                No Transactions Found.
                            </TableCell>
                        </TableRow>
                ) : (      
                    filteredAndSortedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>         
                            <TableCell>
                                <Checkbox onCheckedChange = {() => handleSelect(transaction.id)} 
                                    checked={selectedIds.includes(transaction.id)}
                                />
                            </TableCell>
                            <TableCell>
                                {format(new Date(transaction.date) , "pp")}
                            </TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell className={`capitalize`}>
                                <span style={{
                                    backgroundColor: categoryColors[transaction.category],
                                    }}
                                    className='px-2 py-1 rounded text-white text-sm'>
                                    {transaction.category}
                                </span>                               
                            </TableCell>
                            <TableCell className="text-right font-medium"
                                style={{
                                    color: transaction.type === "EXPENSE" ? "red" : "green",
                                }}
                            >
                                {transaction.type === "EXPENSE" ? "-" : "+"} ₹  
                                {transaction.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                {transaction.isRecurring ? (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Badge variant="outline" className={`gap-1 bg-purple-100 hover:bg-purple-200 text-fuchsia-600`}>
                                                    <RefreshCw className='h-3 w-3'/>
                                                        {
                                                        RECURRING_INTERVALS[
                                                            transaction.recurringInterval
                                                            ]
                                                        }
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <div className='text-sm'>
                                                    <div className='font-medium'>Next Date:</div>
                                                    <div>
                                                        {format(
                                                            new Date(transaction.nextRecurringDate),"pp"
                                                        )}
                                                    </div>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ):(
                                    <Badge variant="outline" className={`gap-1`}>
                                        <Clock className='h-3 w-3'/>
                                        One-time
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className='h-8 w-8 p-0 '>
                                            <MoreHorizontal className='h-4 w-4' />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel
                                            onClick = {() => 
                                            router.push(`/transaction/create?edit=${transaction.id}`
                                             )}
                                        >     
                                            Edit
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className={`text-destructive`}
                                            // onClick = {() => deleteFn([transaction.id])}
                                        >
                                            Delete
                                        </DropdownMenuItem>                                        
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default Transactiontable