import { useState } from 'react'
import RegistrationForm from '../components/RegistrationForm'
import SuccessMessage from '../components/SuccessMessage'
import UsersList from '../components/UsersList'

const RegistrationPage = () => {
  const [registeredUser, setRegisteredUser] = useState(null)
  const [refreshUsers, setRefreshUsers] = useState(0)

  const handleRegistrationSuccess = (userData) => {
    setRegisteredUser(userData)
    setRefreshUsers(prev => prev + 1)
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setRegisteredUser(null)
    }, 5000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Registration Form Section */}
          <div className="flex flex-col">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight">
                User Registration
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your account with server-side validation
              </p>
            </div>
            
            {registeredUser && (
              <SuccessMessage user={registeredUser} />
            )}
            
            <RegistrationForm onSuccess={handleRegistrationSuccess} />
          </div>

          {/* Registered Users Section */}
          <div className="flex flex-col">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-semibold tracking-tight">
                Registered Users
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                View all successfully registered users
              </p>
            </div>
            
            <UsersList key={refreshUsers} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
