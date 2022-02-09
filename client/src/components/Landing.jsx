const Player = ({bgColor, position, name}) => (
    <div class={`${bgColor} box-border h-60 w-60 grid grid-rows-3 grid-flow-col justify-center`}>
        <div>
            {`${position}: ${name}`}
        </div>
        <div>
            <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png" alt="LeBron James"/>
        </div>
    </div>
)

//Figure out the slideshow of players effect
const Landing = () => (
    <div class="box-border h-screen w-full bg-rose-200">
        <span class="flex place-content-end p-2">Connect Wallet</span>
        <span class="flex place-content-center p-2">Colosseum</span>
        <div class="flex justify-center">
            <Player position='PG' bgColor='bg-green-200' name='LeBron James'/>
            <Player position='SG' bgColor='bg-blue-200'/>
            <Player position='SF' bgColor='bg-orange-200'/>
            <Player position='PF' bgColor='bg-yellow-200'/>
            <Player position='C' bgColor='bg-purple-200'/>
        </div>
        <div class="flex place-content-center p-2">
            Owned Players
        </div>
        <div class="flex justify-center">
            <Player position='PG' bgColor='bg-green-200'/>
            <Player position='SG' bgColor='bg-blue-200'/>
            <Player position='SF' bgColor='bg-orange-200'/>
            <Player position='PF' bgColor='bg-yellow-200'/>
            <Player position='C' bgColor='bg-purple-200'/>
            <Player position='PG' bgColor='bg-green-200'/>
            <Player position='SG' bgColor='bg-blue-200'/>
            <Player position='SF' bgColor='bg-orange-200'/>
        </div>
    </div>
    
)
export default Landing