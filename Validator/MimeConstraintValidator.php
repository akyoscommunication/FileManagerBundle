<?php

namespace Akyos\FileManagerBundle\Validator;

use Akyos\FileManagerBundle\Entity\File;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Class MimeConstraintValidator
 * @package Akyos\FileManagerBundle\Validator
 */
class MimeConstraintValidator extends ConstraintValidator
{
    /** @var EntityManagerInterface */
    private EntityManagerInterface $em;
    /** @var KernelInterface */
    private KernelInterface $kernel;

    public function __construct(EntityManagerInterface $em, KernelInterface $kernel)
    {
        $this->em = $em;
        $this->kernel = $kernel;
    }

    public function validate($value, Constraint $constraint)
    {
        /** FileManagerCollectionType */
        if (is_array($value)) {
            foreach ($value as $i) {
                $this->findFile($i, $constraint);
            }
        }
        /** FileManagerType */
        else if (is_string($value)) {
            $this->findFile($value, $constraint);
        }
    }

    public function findFile($id, Constraint $constraint)
    {
        $file = $this->em->getRepository(File::class)->find($id);
        if ($file) {
            if (file_exists($this->kernel->getProjectDir().'/public'.$file->getFile())) {
                $mime = mime_content_type($this->kernel->getProjectDir().'/public'.$file->getFile());
            } else if (file_exists($this->kernel->getProjectDir().$file->getFile())) {
                $mime = mime_content_type($this->kernel->getProjectDir().$file->getFile());
            } else {
                $mime = false;
            }

            if ($mime && !in_array($mime, $constraint->types)) {
                $this->context->buildViolation($constraint->message)
                    ->setParameter('{{ value }}', $file->getName())
                    ->setParameter('{{ types }}', implode(',', $constraint->types))
                    ->addViolation();
            }
            if (!$mime) {
                $this->context->buildViolation($constraint->message)
                    ->setParameter('{{ value }}', $file->getName())
                    ->setParameter('{{ types }}', implode(',', $constraint->types))
                    ->addViolation();
            }
        } else {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $file->getName())
                ->setParameter('{{ types }}', implode(',', $constraint->types))
                ->addViolation();
        }
    }
}
