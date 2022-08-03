<?php

namespace Akyos\FileManagerBundle\Controller;

use Exception;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

#[Route(path: '/file-manager', name: 'file_manager_')]
class SecurityController extends AbstractController
{
    /**
     * @param AuthenticationUtils $authenticationUtils
     * @return Response
     */
    #[Route(path: '/login', name: 'login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the account
        $lastUsername = $authenticationUtils->getLastUsername();
        return $this->render('@AkyosCms/security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @throws Exception
     */
    #[Route(path: '/logout', name: 'logout')]
    public function logout(): void
    {
        throw new RuntimeException('This method can be blank - it will be intercepted by the logout key on your firewall');
    }
}
