    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">LOGISTICA</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
            <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label for="email" className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                        <input
                        id="email" 
                        type="email" 
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                            />
                    </div>   

                    <div>
                        <label for="password" className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                        <input 
                        type="password" 
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        />

                    </div>

                    <a
                    className="group text-blue-400 transition-all px-6 mx-4 justify-center duration-100 ease-in-out"
                    
                    onClick={handleForgotPasswordClick}
                    >
                    <span
                        className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                    >
                        Forget your password?
                    </span>
                    </a>

                    <button type="button" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        <span className="inline-block mr-2">Login</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
              </form>

            </div>

            {showForgotPassword && (
          <div className="mt-4">
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className='px-3 mx-4'>           
                <label htmlFor="forgotPasswordEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter your email to reset password
                </label>
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="flex justify-between mx-4 mt-3 my-3">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Reset Email
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="ml-2 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Forgot Password Success/Error Message */}
        {forgotPasswordSuccess && (
          <p className="text-green-600 mt-2">Password reset email sent successfully!</p>
        )}
        {forgotPasswordError && (
          <p className="text-red-600 mt-2">{forgotPasswordError}</p>
        )}



        </div>

        <div class="py-5">
            <div class="grid grid-cols-2 gap-1">
                <div class="text-center sm:text-left whitespace-nowrap">
                    <Link to="/auth/register" class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span class="inline-block ml-1">sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</div>