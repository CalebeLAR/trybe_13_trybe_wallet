<tr key={ expense.id }>
  <td>{expense.description}</td>
  <td>{expense.tag}</td>
  <td>{expense.method}</td>
  <td>{this.getExpenseValue(expense)}</td>
  <td>{this.getCurrencyName(expense)}</td>
  <td>{this.getCurrencyASK(expense)}</td>
  <td>{this.getExpenseCotation(expense)}</td>
  <td>BRL</td>
  <td>
    <button
      data-testid="delete-btn"
      type="button"
      onClick={ () => (this.buttonEdit(expense.id)) }
    >
      editar/excluir
    </button>
  </td>
</tr>;
