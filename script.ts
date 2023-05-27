// Class representing an Account
class Account {
  private accountName: string;
  private accountBalance: number;
  private accountNumber: string;

  constructor(name: string, balance: number, number: string) {
    this.accountName = name;
    this.accountBalance = balance;
    this.accountNumber = number;
  }

  // Method to deposit into the account
  deposit(amount: number): void {
    this.accountBalance += amount;
  }

  // Method to withdraw from the account
  withdraw(amount: number): void {
    if (amount <= this.accountBalance) {
      this.accountBalance -= amount;
    } else {
      console.log("Insufficient funds!");
    }
  }

  // Method to transfer to another account
  transfer(amount: number, account: Account, bank: string): void {
    if (amount <= this.accountBalance) {
      this.accountBalance -= amount;
      account.deposit(amount);
      console.log(`Transferred ${amount} to Account Number ${account.accountNumber} at ${bank} Bank.`);
    } else {
      console.log("Insufficient funds for transfer!");
    }
  }

  // Getter for account name
  getAccountName(): string {
    return this.accountName;
  }

  // Getter for account balance
  getAccountBalance(): number {
    return this.accountBalance;
  }

  // Getter for account number
  getAccountNumber(): string {
    return this.accountNumber;
  }
}

// Retrieve user's inputted values from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const accountName = urlParams.get('account-name') || '';
const accountBalance = parseFloat(urlParams.get('account-balance') || '0');
let accountNumber = urlParams.get('account-number') || '';

// Create an instance of the Account class with the user's values
const userAccount = new Account(accountName, accountBalance, accountNumber);

// Display the user's values on the page
document.getElementById('user-name')!.textContent = userAccount.getAccountName();
document.getElementById('account-name')!.textContent = userAccount.getAccountName();
document.getElementById('account-balance')!.textContent = userAccount.getAccountBalance().toString();
document.getElementById('account-number')!.textContent = userAccount.getAccountNumber();

// Update the Account Number when returning from other pages
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('updatedAccountNumber')) {
    accountNumber = localStorage.getItem('updatedAccountNumber')!;
    userAccount.accountNumber = accountNumber;
    document.getElementById('account-number')!.textContent = accountNumber;
    localStorage.removeItem('updatedAccountNumber');
  }
});

// Handle deposit form submission
const depositForm = document.getElementById('deposit-form') as HTMLFormElement;
depositForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const amountInput = document.getElementById('deposit-amount') as HTMLInputElement;
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount) && amount > 0) {
    userAccount.deposit(amount);
    document.getElementById('account-balance')!.textContent = userAccount.getAccountBalance().toString();
    amountInput.value = '';
    console.log(`Deposited ${amount} into the account.`);
  }
});

// Handle withdrawal form submission
const withdrawForm = document.getElementById('withdraw-form') as HTMLFormElement;
withdrawForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const amountInput = document.getElementById('withdraw-amount') as HTMLInputElement;
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount) && amount > 0) {
    userAccount.withdraw(amount);
    document.getElementById('account-balance')!.textContent = userAccount.getAccountBalance().toString();
    amountInput.value = '';
    console.log(`Withdrawn ${amount} from the account.`);
  }
});

// Handle transfer form submission
const transferForm = document.getElementById('transfer-form') as HTMLFormElement;
transferForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const amountInput = document.getElementById('transfer-amount') as HTMLInputElement;
  const recipientAccountInput = document.getElementById('recipient-account') as HTMLInputElement;
  const recipientBankInput = document.getElementById('recipient-bank') as HTMLInputElement;
  const amount = parseFloat(amountInput.value);
  const recipientAccountNumber = recipientAccountInput.value;
  const recipientBank = recipientBankInput.value;
  if (!isNaN(amount) && amount > 0 && recipientAccountNumber && recipientBank) {
    const recipientAccount = new Account('', 0, recipientAccountNumber);
    userAccount.transfer(amount, recipientAccount, recipientBank);
    document.getElementById('account-balance')!.textContent = userAccount.getAccountBalance().toString();
    amountInput.value = '';
    recipientAccountInput.value = '';
    recipientBankInput.value = '';
  }
});
  