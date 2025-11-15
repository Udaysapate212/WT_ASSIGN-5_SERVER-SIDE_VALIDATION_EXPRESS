const SuccessMessage = ({ user }) => {
  return (
    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
      <div className="flex items-start gap-3">
        <div className="text-2xl text-green-600 dark:text-green-400">✓</div>
        <div className="flex-1">
          <h3 className="font-semibold text-green-900 dark:text-green-100">
            Registration Successful!
          </h3>
          <p className="mt-1 text-sm text-green-700 dark:text-green-300">
            Welcome, <span className="font-medium">{user.username}</span>! Your account has been created successfully.
          </p>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400">
            Email: {user.email}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage
