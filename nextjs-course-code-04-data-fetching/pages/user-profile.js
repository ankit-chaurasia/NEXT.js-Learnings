const UserProfilePage = (props) => {
  const { username } = props;
  return <h1>{username}</h1>;
};

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log(req);
  console.log(res);
  console.log('Server side props !!');
  return {
    props: {
      username: 'new user',
    },
  };
}

export default UserProfilePage;
