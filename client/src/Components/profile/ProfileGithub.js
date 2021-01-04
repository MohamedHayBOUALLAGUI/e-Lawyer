import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../JS/actions/profile";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {repos.map((repo) => (
        <div key={repo.id} className='repo bg-white p-1 my-1'>
          <div>
            <h4>
              <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className='badge badge-primary'>
                Stars: {repo.stargazers_count}
              </li>
              <li className='badge badge-dark'>
                Watchers: {repo.watchers_count}
              </li>
              <li className='badge badge-light'>Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
      <div className='flex items-center justify-center min-h-screen'>
        <div className='max-w-md md:max-w-2xl px-2'>
          <div className='bg-white shadow-xl rounded-lg overflow-hidden md:flex'>
            <div
              className='bg-cover bg-bottom h-56 md:h-auto md:w-56'
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1517736996303-4eec4a66bb17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=80)",
              }}
            ></div>
            <div>
              <div className='p-4 md:p-5'>
                <p className='font-bold text-xl md:text-2xl'>
                  Amsterdam Walking Tour
                </p>
                <p className='text-gray-700 md:text-lg'>
                  Explore popular tourist destinations as well as hidden local
                  favourites.
                </p>
              </div>
              <div className='p-4 md:p-5 bg-gray-100'>
                <div className='sm:flex sm:justify-between sm:items-center'>
                  <div>
                    <div className='text-lg text-gray-700'>
                      <span className='text-gray-900 font-bold'>17</span> per
                      person*
                    </div>
                    <div className='flex items-center'>
                      <div className='flex inline-flex -mx-px'>
                        <svg
                          className='w-4 h-4 mx-px fill-current text-green-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 14 14'
                        >
                          <path d='M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z' />
                        </svg>
                        <svg
                          className='w-4 h-4 mx-px fill-current text-green-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 14 14'
                        >
                          <path d='M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z' />
                        </svg>
                        <svg
                          className='w-4 h-4 mx-px fill-current text-green-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 14 14'
                        >
                          <path d='M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z' />
                        </svg>
                        <svg
                          className='w-4 h-4 mx-px fill-current text-green-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 14 14'
                        >
                          <path d='M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z' />
                        </svg>
                        <svg
                          className='w-4 h-4 mx-px fill-current text-green-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 14 14'
                        >
                          <path d='M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z' />
                        </svg>
                      </div>
                      <div className='text-gray-600 ml-2 text-sm md:text-base mt-1'>
                        28 reviews
                      </div>
                    </div>
                  </div>
                  <button className='mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-indigo-700 hover:bg-indigo-600 font-bold text-white md:text-lg rounded-lg shadow-md'>
                    Book now
                  </button>
                </div>
                <div className='mt-3 text-gray-600 text-sm md:text-base'>
                  *Prices may vary depending on selected date.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func,
  repos: PropTypes.array,
  username: PropTypes.string,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
