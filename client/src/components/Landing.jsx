const Player = ({bgColor, position}) => (
    <div class={`${bgColor} selection:box-border h-50 w-48 grid grid-rows-3 grid-flow-col justify-center`}>
        <div>{position}</div>
        <div>Name:</div>
        <div>Image:</div>
    </div>
)

const Landing = () => (
    //SPLIT EACH BOX INTO A COMPONENT PIECE
    <div>
        <div>
            <span class="flex place-content-center">Colosseum</span>
            <span class="flex place-content-end">Connect Wallet</span>
        </div>
        <div class="flex justify-center box-border h-80 w-full bg-rose-200">
            <Player position='PG' bgColor='bg-green-200'/>
            <Player position='SG' bgColor='bg-blue-200'/>
            <Player position='SF' bgColor='bg-orange-200'/>
            <Player position='PF' bgColor='bg-yellow-200'/>
            <Player position='C' bgColor='bg-purple-200'/>
        </div>
    </div>
    
)
export default Landing