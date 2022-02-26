/**
 * Contains information about:
 * Wallet Address (string)
 * Username (string)
 * Transactions (transaction_references [])
 */
export const userSchema = {
  name: "users",
  title: "Users",
  type: "document",
  fields: [
    {
      name: "address",
      title: "Wallet Address",
      type: "string",
    },
    {
      name: "userName",
      title: "User Name",
      type: "string",
    },
    {
      name: "transactions",
      title: "Transactions",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "transactions" }],
        },
      ],
    },
  ],
}
