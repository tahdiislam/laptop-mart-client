import React from "react";
import { Link } from "react-router-dom";

export const Blog = () => {
  return (
    <div className="px-4 py-16 mx-auto w-full md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="db164e35-2a0e-4c0f-ab05-f14edc6d4d30"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#db164e35-2a0e-4c0f-ab05-f14edc6d4d30)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative text-primary">You</span>
          </span>{" "}
          need to know
        </h2>
      </div>
      <div className="grid gap-5 mb-8 lg:grid-cols-3 sm:mx-auto lg:max-w-full">
        <div className="px-10 py-20 text-center border rounded lg:px-5 lg:py-10 xl:py-20">
          <Link
            to="/"
            className="inline-block max-w-xs mx-auto mb-3 text-2xl font-extrabold leading-7 transition-colors duration-200 hover:text-deep-purple-accent-400"
            aria-label="Read article"
            title="Nori grape silver beet broccoli kombu beet"
          >
            What are the different ways to manage a state in a React
            application?
          </Link>
          <p className="max-w-xs mx-auto mb-2 text-gray-700 text-justify">
            There are four main types of state you need to properly manage in
            your React apps: Local state, Global state, Server state, URL
            state.Local state is perhaps the easiest kind of state to manage in
            React, considering there are so many tools built into the core React
            library for managing it.
          </p>
        </div>
        <div className="px-10 py-20 text-center border rounded lg:px-5 lg:py-10 xl:py-20">
          <Link
            to="/"
            className="inline-block max-w-xs mx-auto mb-3 text-2xl font-extrabold leading-7 transition-colors duration-200 hover:text-deep-purple-accent-400"
            aria-label="Read article"
            title="Nori grape silver beet broccoli kombu beet"
          >
            How does prototypical inheritance work?
          </Link>
          <p className="max-w-xs mx-auto mb-2 text-gray-700 text-justify">
            JavaScript only has one construct: objects. Each object has a
            private property which holds a link to another object called its
            prototype. That prototype object has a prototype of its own, and so
            on until an object is reached with null as its prototype. By
            definition, null has no prototype, and acts as the final link in
            this prototype chain. It is possible to mutate any member of the
            prototype chain or even swap out the prototype at runtime.
          </p>
        </div>
        <div className="px-10 py-20 text-center border rounded lg:px-5 lg:py-10 xl:py-20">
          <Link
            to="/"
            className="inline-block max-w-xs mx-auto mb-3 text-2xl font-extrabold leading-7 transition-colors duration-200 hover:text-deep-purple-accent-400"
            aria-label="Read article"
            title="Nori grape silver beet broccoli kombu beet"
          >
            What is a unit test? Why should we write unit tests?
          </Link>
          <p className="max-w-xs mx-auto mb-2 text-gray-700 text-justify">
            The main objective of unit testing is to isolate written code to
            test and determine if it works as intended. Unit testing is an
            important step in the development process, because if done
            correctly, it can help detect early flaws in code which may be more
            difficult to find in later testing stages.
          </p>
        </div>
        <div className="px-10 py-20 text-center border rounded lg:px-5 lg:py-10 xl:py-20">
          <Link
            to="/"
            className="inline-block max-w-xs mx-auto mb-3 text-2xl font-extrabold leading-7 transition-colors duration-200 hover:text-deep-purple-accent-400"
            aria-label="Read article"
            title="Nori grape silver beet broccoli kombu beet"
          >
            React vs. Angular vs. Vue?
          </Link>
          <p className="max-w-xs mx-auto mb-2 text-gray-700 text-justify">
            Angular, developed by Google, was first released in 2010, making it
            the oldest of the lot. It is a TypeScript-based JavaScript
            framework. Vue is generally more suited to smaller, less complex
            apps and is easier to learn from scratch compared to React. Vue can
            be easier to integrate into new or existing projects and many feel
            its use of HTML templates along with JSX is an advantage. React,
            developed by Facebook, was initially released in 2013. Facebook uses
            React extensively in their products (Facebook, Instagram, and
            WhatsApp). Similar to Vue, the React developers also announce their
            newest version on the blog section of the React website.
          </p>
        </div>
      </div>
    </div>
  );
};
