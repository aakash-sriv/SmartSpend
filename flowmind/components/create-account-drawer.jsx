"use client";

import React, { useState } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';

const CreateAccountDrawer = ({children}) => {
    const [open , setOpen ] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>
                    open
                </DrawerTitle>
            </DrawerHeader>
        </DrawerContent>
    </Drawer>
  )
}

export default CreateAccountDrawer