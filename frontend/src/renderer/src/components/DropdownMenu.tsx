import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { useState } from 'react';
import DialogMenu from './DialogMenu';

export default function Dropdown({ userId }): JSX.Element {
  const [editingUser, setEditingUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // Novo estado para controlar a abertura do diálogo

  const onDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3333/delete/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="mb-4 text-[18px] mt-6 rounded-md bg-white text-pink-600 hover:bg-purple-500 hover:text-white py-2 transition-colors duration-300 px-2">
          <HamburgerMenuIcon />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white rounded shadow-lg mt-2 text-pink-900 border-2">
        <DropdownMenu.Item onSelect={() => { setEditingUser(userId); setDialogOpen(true); }} className="px-4 py-2 hover:bg-gray-200">Editar</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={onDelete} className="px-4 py-2 hover:bg-gray-200">Excluir</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {editingUser && (
        <Dialog.Root open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditingUser(null); }}>
          <DialogMenu/>
        </Dialog.Root>
      )}
    </div>
  )
}
