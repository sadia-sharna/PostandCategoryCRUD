<template>
<div id="app">
    <nav class="navbar navbar-expand-lg bg-primary shadow-sm">
        <div id="navbarNavDropdown" class="collapse navbar-collapse">
            <ul class="navbar-nav w-100">

                <li class="nav-item active" style="cursor:pointer">
                    <a class="nav-link ">
                        <router-link class="text-white" to="/">Post</router-link>
                    </a>
                </li>
                <li class="nav-item active " style="cursor:pointer">
                    <a class="nav-link">
                        <router-link class="text-white" to="/category">Category</router-link>
                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <router-view />
</div>
</template>
