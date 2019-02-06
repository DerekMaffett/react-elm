port module React exposing (nonInteractiveReactElement, reactElement)

import Browser exposing (element)
import Html exposing (Html)
import Json.Decode as D
import Tuple


type alias Config props consumerModel consumerMsg =
    { init : ( consumerModel, Cmd consumerMsg )
    , update : consumerMsg -> consumerModel -> ( consumerModel, Cmd consumerMsg )
    , subscriptions : consumerModel -> Sub consumerMsg
    , view : props -> consumerModel -> Html consumerMsg
    , propsDecoder : D.Decoder props
    }


nonInteractiveReactElement options =
    internalReactElement
        { init = ( {}, Cmd.none )
        , view = \props -> \model -> options.view props
        , update = \msg -> \model -> ( {}, Cmd.none )
        , subscriptions = \_ -> Sub.none
        , propsDecoder = options.propsDecoder
        }


reactElement options =
    internalReactElement
        { init = options.init
        , view = options.view
        , update = options.update
        , subscriptions = \_ -> Sub.none
        , propsDecoder = options.propsDecoder
        }


internalReactElement config =
    element
        { init = init config
        , view = view config
        , update = update config
        , subscriptions = subscriptions config
        }


port propsUpdated : (D.Value -> consumerMsg) -> Sub consumerMsg


subscriptions :
    Config props consumerModel consumerMsg
    -> Model props consumerModel
    -> Sub (Msg props consumerMsg)
subscriptions config model =
    Sub.batch
        [ propsUpdated (PropsUpdated << Result.toMaybe << D.decodeValue config.propsDecoder)
        , Sub.map ConsumerEvent <| config.subscriptions model.consumerModel
        ]


type alias Model props consumerModel =
    { props : Maybe props
    , consumerModel : consumerModel
    }


init :
    Config props consumerModel consumerMsg
    -> D.Value
    -> ( Model props consumerModel, Cmd (Msg props consumerMsg) )
init config flagsValue =
    let
        decoder =
            D.field "props" config.propsDecoder

        maybeProps =
            Result.toMaybe << D.decodeValue decoder <| flagsValue
    in
    ( { props = maybeProps
      , consumerModel = Tuple.first config.init
      }
    , Cmd.map ConsumerEvent <| Tuple.second config.init
    )


type Msg props consumerMsg
    = PropsUpdated (Maybe props)
    | ConsumerEvent consumerMsg


update :
    Config props consumerModel consumerMsg
    -> Msg props consumerMsg
    -> Model props consumerModel
    -> ( Model props consumerModel, Cmd (Msg props consumerMsg) )
update config msg model =
    case msg of
        PropsUpdated maybeProps ->
            ( { model | props = maybeProps }, Cmd.none )

        ConsumerEvent consumerMsg ->
            let
                ( newModel, command ) =
                    config.update consumerMsg model.consumerModel
            in
            ( { model | consumerModel = newModel }, Cmd.map ConsumerEvent command )


view : Config props consumerModel consumerMsg -> Model props consumerModel -> Html (Msg props consumerMsg)
view config model =
    case model.props of
        Just props ->
            Html.map ConsumerEvent <| config.view props model.consumerModel

        Nothing ->
            Html.text ""
