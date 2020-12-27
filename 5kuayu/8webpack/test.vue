<script>
export default {
    name:"Test",
    props:{
        msg:String
    },
    mounted:async ()=>{
        const res = await axios.get("/api/users");
        console.log("data",res.data);
    }
}
</script>