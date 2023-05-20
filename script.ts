class Account {
    bankName: string;
      owner: string;
        balance: number;
          accountNumber: string;

            constructor(
                bankName: string,
                    owner: string,
                        balance: number,
                            accountNumber: string
                              ) {
                                  this.bankName = bankName;
                                      this.owner = owner;
                                          this.balance = balance;
                                              this.accountNumber = accountNumber;
                                                }

                                                  deposit(amount: number): void {
                                                      this.balance += amount;
                                                        }

                                                          withdraw(amount: number): void {
                                                              if (this.balance >= amount) {
                                                                    this.balance -= amount;
                                                                        } else {
                                                                              throw new Error("Insufficient funds");
                                                                                  }
                                                                                    }

                                                                                      transfer(amount: number, toAccount: Account): void {
                                                                                          if (this.balance >= amount) {
                                                                                                this.balance -= amount;
                                                                                                      toAccount.balance += amount;
                                                                                                          } else {
                                                                                                                throw new Error("Insufficient funds");
                                                                                                                    }
                                                                                                                      }
                                                                                                                      }

                                                                                                                      const account = new Account("My Bank", "John Doe", 1000, "1234567890");

                                                                                                                      // Update HTML with account details
                                                                                                                      const bankNameEl = document                                                                                                                  
