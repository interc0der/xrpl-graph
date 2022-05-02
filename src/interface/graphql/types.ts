export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type AuthInput = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  access_token?: Maybe<Scalars['ID']>;
  refresh_token?: Maybe<Scalars['ID']>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  refresh?: Maybe<Scalars['String']>;
  signin?: Maybe<AuthResult>;
  signup?: Maybe<AuthResult>;
};


export type MutationRefreshArgs = {
  token?: InputMaybe<Scalars['String']>;
};


export type MutationSigninArgs = {
  input?: InputMaybe<AuthInput>;
};


export type MutationSignupArgs = {
  input?: InputMaybe<AuthInput>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  likes?: Maybe<Array<Maybe<User>>>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};


export type QueryMeArgs = {
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  friends?: Maybe<Array<Maybe<User>>>;
  id: Scalars['ID'];
  my_posts?: Maybe<Array<Maybe<Post>>>;
  name: Scalars['String'];
  timeline?: Maybe<Array<Maybe<Post>>>;
};
