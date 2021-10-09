
const ListUsers = ({ list }) => {
  return (
    <div>
      {
        list.length === 0
          ? <div>Nenhum Jogador na sala</div>
          : <>
            <h2>Jogadores na sala</h2>
            <ul>
              {
                list.map((player, index) => (
                  <li key={player.username + index} >{player.username}</li>
                ))
              }
            </ul>
          </>

      }
    </div>
  );
}


export default ListUsers;
