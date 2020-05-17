import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button, Alert } from 'react-bootstrap';
import Recipe from './Recipe';
import Icon from './icon';
import { TelegramShareButton, WhatsappShareButton } from 'react-share';
import { TelegramIcon, WhatsappIcon } from 'react-share';

const Col = styled.div`
	width: 50%;
	display: inline-block;
	@media only screen and (max-width: 480px) {
		width: 100%;
		padding-bottom: 10px;
	}
`;

const Row = styled.div`
	display: flex;
	@media only screen and (max-width: 480px) {
		display: block;
	}
`;
const SCard = styled(Card)`
	max-width: 600px;
	margin: auto;
	border-radius: 20px;
	overflow: hidden;
	margin-bottom: 1rem;
`;

const SCardTitle = styled.h4`
	font-weight: 700;
	padding-top: 0.7rem;
`;

const Link = styled.a`
	text-decoration: underline;
	color: black;
	align-self: flex-start;
	width: fit-content;
	vertical-align: -webkit-baseline-middle;
`;

const SRButton = styled(Button)`
	align-self: flex-end;
	width: fit-content;
	display: flex;
	float: right;
	@media only screen and (max-width: 480px) {
		float: left;
	}
	border-radius: 15px;
	padding-right: 15px;
	padding-left: 15px;
	margin: 5px;
	vertical-align: -webkit-baseline-middle;
`;

const ShareButtonT = styled(TelegramShareButton)`
	align-self: flex-end;
	width: fit-content;
	display: flex;
	float: right;
	@media only screen and (max-width: 480px) {
		float: left;
	}
	border-radius: 15px;
	padding-right: 15px;
	padding-left: 15px;
	margin: 5px;
	vertical-align: -webkit-baseline-middle;
`;

const ShareButtonW = styled(WhatsappShareButton)`
	align-self: flex-end;
	width: fit-content;
	display: flex;
	float: right;
	@media only screen and (max-width: 480px) {
		float: left;
	}
	border-radius: 15px;
	padding-right: 15px;
	padding-left: 15px;
	margin: 5px;
	vertical-align: -webkit-baseline-middle;
`;

const StyledCardImg = styled(Card.Img)`
	width: 100%;
	height: 20rem;
	object-fit: cover;
	background: no-repeat center;
`;

const StyledCardBody = styled(Card.Body)`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const RecommendedCard = ({ recipe, isSavedRecipe, onSave, onUnsave }) => {
	const [recipeSavedState, setRecipeSavedState] = useState(isSavedRecipe);
	const [copiedState, setCopiedState] = useState(false);

	useEffect(() => {
		setRecipeSavedState(isSavedRecipe);
	}, [isSavedRecipe]);

	const extractHostname = (url) => {
		var hostname;
		//find & remove protocol (http, ftp, etc.) and get hostname

		if (url.indexOf('//') > -1) {
			hostname = url.split('/')[2];
		} else {
			hostname = url.split('/')[0];
		}

		//find & remove port number
		hostname = hostname.split(':')[0];
		//find & remove "?"
		hostname = hostname.split('?')[0];

		return hostname;
	};

	const copyUrl = (url) => {
		var data = document.createElement('textarea');
		document.body.appendChild(data);
		data.value = url;
		data.select();
		document.execCommand('copy');

		console.log('copied' + url);
		document.body.removeChild(data);
	};

	return (
		<SCard>
			<StyledCardImg variant="top" src={recipe.image} />
			<Alert show={copiedState} variant="success">
				Link copied
			</Alert>
			<StyledCardBody>
				<SCardTitle>{recipe.title}</SCardTitle>
				<Row>
					<Col>
						<Link href={recipe.sourceUrl} target="_blank">
							{extractHostname(recipe.sourceUrl)}
						</Link>
					</Col>
					<Col>
						{copiedState ? (
							<SRButton
								style={{ padding: '5px' }}
								variant="success"
								round
								onClick={() => {
									copyUrl(recipe.sourceUrl);
									setCopiedState(true);
								}}
							>
								<Icon name="checkall"></Icon>
							</SRButton>
						) : (
							<SRButton
								style={{ padding: '5px' }}
								variant="info"
								round
								onClick={() => {
									copyUrl(recipe.sourceUrl);
									setCopiedState(true);
								}}
							>
								<Icon name="copy"></Icon>
							</SRButton>
						)}

						<ShareButtonT
							title="Here's a recipe I found!"
							url={recipe.sourceUrl}
						>
							<TelegramIcon size={32} round />
						</ShareButtonT>
						<ShareButtonW
							title="Here's a recipe I found!"
							url={recipe.sourceUrl}
						>
							<WhatsappIcon size={32} round />
						</ShareButtonW>
						{recipeSavedState ? (
							<SRButton
								size="sm"
								variant="info"
								onClick={() => {
									onUnsave();
									setRecipeSavedState(false);
								}}
							>
								Saved
							</SRButton>
						) : (
							<SRButton
								size="sm"
								variant="outline-info"
								onClick={() => {
									onSave();
									setRecipeSavedState(true);
								}}
							>
								Save
							</SRButton>
						)}
					</Col>
				</Row>

				<Recipe
					key={recipe.id}
					id={recipe.id}
					recipeIngredients={recipe.extendedIngredients}
					recipeMethod={recipe.analyzedInstructions}
				/>
				<Button variant="primary" href={recipe.sourceUrl} target="_blank">
					Go to site
				</Button>
			</StyledCardBody>
		</SCard>
	);
};

export default RecommendedCard;
