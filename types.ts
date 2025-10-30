import React from 'react';

export interface Debt {
  id: number;
  creditor: string;
  type: string;
  principal: number;
  interestRate: number;
  minPayment: number;
  dueDate: number;
  notes: string;
}

export interface BudgetItem {
  name: string;
  percentage: number;
  amount: number;
  color: string;
  description: string;
}

export interface CostCuttingTip {
  id: string;
  category: string;
  tip: string;
  completed: boolean;
}

export interface IncomeSource {
    id: number;
    source: string;
    description: string;
    skills: string;
    platform: string;
    potential: string;
}

export interface ActionTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Transaction {
  id: string;
  date: string; // ISO string format
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string; // value from Category
}

export interface Category {
    value: string;
    label: string;
    type: 'income' | 'expense';
    icon: React.ElementType;
}
