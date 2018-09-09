/*
Autor: Marcus Dantas

Exemplo de uso:
        let teste = [{
            oi: "hahahah",
            serafina:[{
                oi: "que merda em"
            }],
            sabrinha: "kakaka"
        },
        {
            oi: "asds",
            serafina:" jajssssajaj",
            sabrinha: "kakasdaaka"
        }];
        O primeiro parametro é o json o segundo as chaves do json original e o terceiro o novo nome das chavas.
        let novoJson = utilJson.mutationArrayJson(teste,["oi", "serafina"],["risada", "nome"]);
        console.log(novoJson);
        retorno:
        let teste = [{
            risada: "hahahah",
            nome:[{
                oi: "que merda em"
            }]
        },
        {
            risada: "asds",
            nome:" jajssssajaj"
        }];
*/
const mutationJson = (jsonOriginal, arrayChavesOriginal, arrayChavesMutacao) =>{
    if(arrayChavesMutacao.length !== arrayChavesOriginal.length) return {};
    let jsonMutation = {};
    
    arrayChavesOriginal.map((chaveOriginal, index)=>{
        jsonMutation[arrayChavesMutacao[index]] = jsonOriginal[chaveOriginal];
        return null;
    });
    return jsonMutation;
}

const mutationArrayJson = (arrayJson, arrayChavesOriginal, arrayChavesMutacao) =>{
    let arrayRetorno = [];
    arrayJson.map((obj,index)=>{
        let jsonObj = mutationJson(obj, arrayChavesOriginal, arrayChavesMutacao);
        arrayRetorno.push(jsonObj);
        return null;
    });
    return arrayRetorno;
};
export default {mutationJson, mutationArrayJson};