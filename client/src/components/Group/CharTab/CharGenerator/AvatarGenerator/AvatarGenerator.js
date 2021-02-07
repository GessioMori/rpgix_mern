import React, { useState, useEffect, useMemo } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@material-ui/core";
import AvatarImg from "awesome-react-avataaars-multiple";
import useStyles from "./styles";

const AvatarGenerator = ({ parentCallback }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    topType: "",
    hairColor: "",
    accessoriesType: "",
    hatColor: "",
    facialHairType: "",
    facialHairColor: "",
    clotheType: "CollarSweater",
    clotheColor: "",
    eyeType: "",
    eyebrowType: "",
    mouthType: "",
    skinColor: "",
  });

  const [hideHairColor, setHideHairColor] = useState(false);
  const [hideAccessories, setHideAccessories] = useState(false);
  const [hideHatColor, setHideHatColor] = useState(true);
  const [hideFacialHairColor, setHideFacialHairColor] = useState(true);

  const noHairColorArray = useMemo(
    () => [
      "NoHair",
      "Eyepatch",
      "Hat",
      "Turban",
      "WinterHat1",
      "WinterHat2",
      "WinterHat3",
      "WinterHat4",
      "LongHairFrida",
    ],
    []
  );

  const hatColorArray = useMemo(
    () => ["Turban", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4"],
    []
  );

  const handleChange = (e, c) => {
    setFormData({ ...formData, [e.target.name]: c.props.value });
  };

  useEffect(() => {
    parentCallback(formData);
  }, [parentCallback, formData]);

  useEffect(() => {
    if (formData.topType === "Eyepatch") {
      setHideHairColor(true);
      setHideAccessories(true);
    } else if (noHairColorArray.includes(formData.topType)) {
      setHideHairColor(true);
      setHideAccessories(false);
    } else {
      setHideHairColor(false);
      setHideAccessories(false);
    }
  }, [formData.topType, noHairColorArray]);

  useEffect(() => {
    if (formData.facialHairType === "Blank" || formData.facialHairType === "") {
      setHideFacialHairColor(true);
    } else {
      setHideFacialHairColor(false);
    }
  }, [formData.facialHairType]);

  useEffect(() => {
    if (hatColorArray.includes(formData.topType)) {
      setHideHatColor(false);
    } else {
      setHideHatColor(true);
    }
  }, [formData.topType, hatColorArray]);

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h6">
          Monte um avatar para seu personagem
        </Typography>
      </div>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.containerImg}>
          <AvatarImg
            style={{ width: "200px", height: "200px" }}
            avatarStyle="Circle"
            topType={formData.topType}
            hatColor={formData.hatColor}
            accessoriesType={formData.accessoriesType}
            hairColor={formData.hairColor}
            facialHairType={formData.facialHairType}
            facialHairColor={formData.facialHairColor}
            clotheType={formData.clotheType}
            clotheColor={formData.clotheColor}
            eyeType={formData.eyeType}
            eyebrowType={formData.eyebrowType}
            mouthType={formData.mouthType}
            skinColor={formData.skinColor}
          />
        </Grid>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="skinColor" color="secondary">
              Pele
            </InputLabel>
            <Select
              labelId="skinColor"
              name="skinColor"
              onChange={handleChange}
              value={formData.skinColor}
              label="Pele"
              color="secondary"
            >
              <MenuItem value="Black">Tom 1</MenuItem>
              <MenuItem value="DarkBrown">Tom 2</MenuItem>
              <MenuItem value="Brown">Tom 3</MenuItem>
              <MenuItem value="Light">Tom 4</MenuItem>
              <MenuItem value="Pale">Tom 5</MenuItem>
              <MenuItem value="Yellow">Tom 6</MenuItem>
              <MenuItem value="Tanned">Tom 7</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="topType" color="secondary">
              Cabelo
            </InputLabel>
            <Select
              labelId="topType"
              name="topType"
              onChange={handleChange}
              value={formData.topType}
              label="Cabelo"
              color="secondary"
            >
              <MenuItem value="NoHair">Sem cabelo</MenuItem>
              <MenuItem value="Eyepatch">Tapa olho</MenuItem>
              <MenuItem value="Hat">Chapéu</MenuItem>
              <MenuItem value="Turban">Turbante</MenuItem>
              <MenuItem value="WinterHat1">Touca 1</MenuItem>
              <MenuItem value="WinterHat2">Touca 2</MenuItem>
              <MenuItem value="WinterHat3">Touca 3</MenuItem>
              <MenuItem value="WinterHat4">Touca 4</MenuItem>
              <MenuItem value="LongHairBigHair">Cabelo comprido 1</MenuItem>
              <MenuItem value="LongHairBob">Cabelo comprido 2</MenuItem>
              <MenuItem value="LongHairBun">Cabelo comprido 3</MenuItem>
              <MenuItem value="LongHairCurly">Cabelo comprido 4</MenuItem>
              <MenuItem value="LongHairCurvy">Cabelo comprido 5</MenuItem>
              <MenuItem value="LongHairDreads">Cabelo comprido 6</MenuItem>
              <MenuItem value="LongHairFrida">Cabelo comprido 7</MenuItem>
              <MenuItem value="LongHairFro">Cabelo comprido 8</MenuItem>
              <MenuItem value="LongHairFroBand">Cabelo comprido 9</MenuItem>
              <MenuItem value="LongHairNotTooLong">Cabelo comprido 10</MenuItem>
              <MenuItem value="LongHairMiaWallace">Cabelo comprido 11</MenuItem>
              <MenuItem value="LongHairStraight">Cabelo comprido 12</MenuItem>
              <MenuItem value="LongHairStraight2">Cabelo comprido 13</MenuItem>
              <MenuItem value="LongHairStraightStrand">
                Cabelo comprido 14
              </MenuItem>
              <MenuItem value="ShortHairDreads01">Cabelo curto 1</MenuItem>
              <MenuItem value="ShortHairDreads02">Cabelo curto 2</MenuItem>
              <MenuItem value="ShortHairFrizzle">Cabelo curto 3</MenuItem>
              <MenuItem value="ShortHairShaggyMullet">Cabelo curto 4</MenuItem>
              <MenuItem value="ShortHairShortCurly">Cabelo curto 5</MenuItem>
              <MenuItem value="ShortHairShortFlat">Cabelo curto 6</MenuItem>
              <MenuItem value="ShortHairShortRound">Cabelo curto 7</MenuItem>
              <MenuItem value="ShortHairShortWaved">Cabelo curto 8</MenuItem>
              <MenuItem value="ShortHairSides">Cabelo curto 9</MenuItem>
              <MenuItem value="ShortHairTheCaesar">Cabelo curto 10</MenuItem>
              <MenuItem value="ShortHairTheCaesarSidePart">
                Cabelo curto 11
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div hidden={hideHairColor}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="hairColor" color="secondary">
              Cor do cabelo
            </InputLabel>
            <Select
              labelId="hairColor"
              name="hairColor"
              onChange={handleChange}
              value={formData.hairColor}
              label="Cor do cabelo"
              color="secondary"
            >
              <MenuItem value="Brown">Castanho</MenuItem>
              <MenuItem value="BrownDark">Castanho escuro</MenuItem>
              <MenuItem value="SilverGray">Grisalho</MenuItem>
              <MenuItem value="Blonde">Loiro 1</MenuItem>
              <MenuItem value="BlondeGolden">Loiro 2</MenuItem>
              <MenuItem value="Platinum">Platinado</MenuItem>
              <MenuItem value="Black">Preto</MenuItem>
              <MenuItem value="PastelPink">Rosa</MenuItem>
              <MenuItem value="Auburn">Ruivo 1</MenuItem>
              <MenuItem value="Red">Ruivo 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div hidden={hideHatColor}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="hatColor" color="secondary">
              Cor do chapéu
            </InputLabel>
            <Select
              labelId="hatColor"
              name="hatColor"
              onChange={handleChange}
              value={formData.hatColor}
              label="Cor do chapéu"
              color="secondary"
            >
              <MenuItem value="PastelYellow">Amarelo claro</MenuItem>
              <MenuItem value="Blue03">Azul</MenuItem>
              <MenuItem value="PastelBlue">Azul claro</MenuItem>
              <MenuItem value="White">Branco</MenuItem>
              <MenuItem value="Gray02">Cinza</MenuItem>
              <MenuItem value="PastelOrange">Laranja claro</MenuItem>
              <MenuItem value="Black">Preto</MenuItem>
              <MenuItem value="Pink">Rosa</MenuItem>
              <MenuItem value="PastelGreen">Verde claro</MenuItem>
              <MenuItem value="Red">Vermelho</MenuItem>
              <MenuItem value="PastelRed">Vermelho claro</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div hidden={hideAccessories}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="accessoriesType" color="secondary">
              Acessório
            </InputLabel>
            <Select
              labelId="accessoriesType"
              name="accessoriesType"
              onChange={handleChange}
              value={formData.accessoriesType}
              label="Acessório"
              color="secondary"
            >
              <MenuItem value="Blank">Nenhum</MenuItem>
              <MenuItem value="Prescription01">Óculos 1</MenuItem>
              <MenuItem value="Prescription02">Óculos 2</MenuItem>
              <MenuItem value="Round">Óculos 3</MenuItem>
              <MenuItem value="Sunglasses">Óculos escuros 1</MenuItem>
              <MenuItem value="Wayfarers">Óculos escuros 2</MenuItem>
              <MenuItem value="Kurt">Óculos escuros 3</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="facialHairType" color="secondary">
              Barba
            </InputLabel>
            <Select
              labelId="facialHairType"
              name="facialHairType"
              onChange={handleChange}
              value={formData.facialHairType}
              label="Barba"
              color="secondary"
            >
              <MenuItem value="Blank">Nenhuma</MenuItem>
              <MenuItem value="BeardLight">Curta</MenuItem>
              <MenuItem value="BeardMedium">Média</MenuItem>
              <MenuItem value="BeardMajestic">Grande</MenuItem>
              <MenuItem value="MoustacheFancy">Bigode 1</MenuItem>
              <MenuItem value="MoustacheMagnum">Bigode 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div hidden={hideFacialHairColor}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="facialHairColor" color="secondary">
              Cor da Barba
            </InputLabel>
            <Select
              labelId="facialHairColor"
              name="facialHairColor"
              onChange={handleChange}
              value={formData.facialHairColor}
              label="Cor da Barba"
              color="secondary"
            >
              <MenuItem value="Brown">Castanho</MenuItem>
              <MenuItem value="BrownDark">Castanho escuro</MenuItem>
              <MenuItem value="Blonde">Loiro 1</MenuItem>
              <MenuItem value="BlondeGolden">Loiro 2</MenuItem>
              <MenuItem value="Platinum">Platinado</MenuItem>
              <MenuItem value="Black">Preto</MenuItem>
              <MenuItem value="Auburn">Ruivo 1</MenuItem>
              <MenuItem value="Red">Ruivo 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="clotheType" color="secondary">
              Roupa
            </InputLabel>
            <Select
              labelId="clotheType"
              name="clotheType"
              onChange={handleChange}
              value={formData.clotheType}
              label="Roupa"
              color="secondary"
            >
              <MenuItem value="CollarSweater">Camisa 1</MenuItem>
              <MenuItem value="ShirtCrewNeck">Camisa 2</MenuItem>
              <MenuItem value="ShirtScoopNeck">Camisa 3</MenuItem>
              <MenuItem value="ShirtVNeck">Camisa 4</MenuItem>
              <MenuItem value="Hoodie">Casaco</MenuItem>
              <MenuItem value="Overall">Macacão</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="clotheColor" color="secondary">
              Cor da roupa
            </InputLabel>
            <Select
              labelId="clotheColor"
              name="clotheColor"
              onChange={handleChange}
              value={formData.clotheColor}
              label="Cor da roupa"
              color="secondary"
            >
              <MenuItem value="PastelYellow">Amarelo claro</MenuItem>
              <MenuItem value="Blue03">Azul</MenuItem>
              <MenuItem value="PastelBlue">Azul claro</MenuItem>
              <MenuItem value="White">Branco</MenuItem>
              <MenuItem value="Gray02">Cinza</MenuItem>
              <MenuItem value="PastelOrange">Laranja claro</MenuItem>
              <MenuItem value="Black">Preto</MenuItem>
              <MenuItem value="Pink">Rosa</MenuItem>
              <MenuItem value="PastelGreen">Verde claro</MenuItem>
              <MenuItem value="Red">Vermelho</MenuItem>
              <MenuItem value="PastelRed">Vermelho claro</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="eyeType" color="secondary">
              Olhos
            </InputLabel>
            <Select
              labelId="eyeType"
              name="eyeType"
              onChange={handleChange}
              value={formData.eyeType}
              label="Olhos"
              color="secondary"
            >
              <MenuItem value="Default">Padrão</MenuItem>
              <MenuItem value="Dizzy">Confusos</MenuItem>
              <MenuItem value="Hearts">Corações</MenuItem>
              <MenuItem value="Cry">Chorando</MenuItem>
              <MenuItem value="Close">Fechados</MenuItem>
              <MenuItem value="Happy">Felizes</MenuItem>
              <MenuItem value="Side">Lado</MenuItem>
              <MenuItem value="Wink">Piscando 1</MenuItem>
              <MenuItem value="WinkWacky">Piscando 2</MenuItem>
              <MenuItem value="Squint">Semiabertos</MenuItem>
              <MenuItem value="Surprised">Surpresos</MenuItem>
              <MenuItem value="EyeRoll">Virados</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="eyebrowType" color="secondary">
              Sobrancelhas
            </InputLabel>
            <Select
              labelId="eyebrowType"
              name="eyebrowType"
              onChange={handleChange}
              value={formData.eyebrowType}
              label="Sobrancelhas"
              color="secondary"
            >
              <MenuItem value="Default">Padrão 1</MenuItem>
              <MenuItem value="DefaultNatural">Padrão 2</MenuItem>
              <MenuItem value="RaisedExcited">Animado 1</MenuItem>
              <MenuItem value="RaisedExcitedNatural">Animado 2</MenuItem>
              <MenuItem value="UpDown">Levantada 1</MenuItem>
              <MenuItem value="UpDownNatural">Levantada 2</MenuItem>
              <MenuItem value="UnibrowNatural">Monocelha</MenuItem>
              <MenuItem value="AngryNatural">Raiva</MenuItem>
              <MenuItem value="FlatNatural">Retas</MenuItem>
              <MenuItem value="SadConcerned">Triste 1</MenuItem>
              <MenuItem value="SadConcernedNatural">Triste 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="mouthType" color="secondary">
              Boca
            </InputLabel>
            <Select
              labelId="mouthType"
              name="mouthType"
              onChange={handleChange}
              value={formData.mouthType}
              label="Boca"
              color="secondary"
            >
              <MenuItem value="Default">Padrão</MenuItem>
              <MenuItem value="Eating">Comendo</MenuItem>
              <MenuItem value="Grimace">Dentes</MenuItem>
              <MenuItem value="Disbelief">Descrença</MenuItem>
              <MenuItem value="ScreamOpen">Gritando</MenuItem>
              <MenuItem value="Tongue">Língua</MenuItem>
              <MenuItem value="Serious">Séria</MenuItem>
              <MenuItem value="Smile">Sorriso 1</MenuItem>
              <MenuItem value="Twinkle">Sorriso 2</MenuItem>
              <MenuItem value="Concerned">Preocupada</MenuItem>
              <MenuItem value="Sad">Triste</MenuItem>
              <MenuItem value="Vomit">Vômito</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
    </>
  );
};

export default React.memo(AvatarGenerator);
