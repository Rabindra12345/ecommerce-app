import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  orders = [
    {
      id: '#1001',
      customer: 'John Doe',
      amount: 120,
      status: 'completed',
      items: ['Shoes', 'T-Shirt']
    },
    {
      id: '#1002',
      customer: 'Jane Smith',
      amount: 80,
      status: 'pending',
      items: ['Bag']
    },
    {
      id: '#1003',
      customer: 'Alex Brown',
      amount: 50,
      status: 'processing',
      items: ['Watch', 'Cap']
    }
  ];
}
