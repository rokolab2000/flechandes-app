
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface DeliveryItem {
  id: number;
  product: string;
  quantity: string;
  destinationAddress: string;
  deliveryDate: string;
  notes: string;
}

const DeliveryTable = () => {
  const [items, setItems] = useState<DeliveryItem[]>([
    {
      id: 1,
      product: '',
      quantity: '',
      destinationAddress: '',
      deliveryDate: '',
      notes: ''
    }
  ]);

  const addRow = () => {
    const newItem: DeliveryItem = {
      id: items.length + 1,
      product: '',
      quantity: '',
      destinationAddress: '',
      deliveryDate: '',
      notes: ''
    };
    setItems([...items, newItem]);
  };

  const removeRow = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof DeliveryItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Dirección de Entrega</TableHead>
              <TableHead>Fecha de Entrega</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Input
                    value={item.product}
                    onChange={(e) => updateItem(item.id, 'product', e.target.value)}
                    placeholder="Nombre del producto"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                    placeholder="Cantidad"
                    type="number"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.destinationAddress}
                    onChange={(e) => updateItem(item.id, 'destinationAddress', e.target.value)}
                    placeholder="Dirección de entrega"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.deliveryDate}
                    onChange={(e) => updateItem(item.id, 'deliveryDate', e.target.value)}
                    type="date"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.notes}
                    onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                    placeholder="Notas adicionales"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRow(item.id)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button onClick={addRow} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Agregar Producto
      </Button>
    </div>
  );
};

export default DeliveryTable;
