<template>
  <header>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4 bg-sky-700">
       <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Science Articles App</span>
       <div class="hidden w-full md:block md:w-auto" id="navbar-default">
         <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-white">
           <li>
             <RouterLink
               to="/"
               class="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white hover:"
               aria-current="page"
             >
               Article Search
             </RouterLink>
           </li>
           <li>
             <RouterLink
               to="/saved-articles"
               class="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white"
               aria-current="page"
             >
               Saved Articles
             </RouterLink>
           </li>
         </ul>
       </div>
      </div>
    </nav>
  </header>
</template>
